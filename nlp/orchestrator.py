import os
import time
import logging
from datetime import datetime
from typing import Dict, Any, Tuple
from tripai.nlp.config import PIPELINE_LOG_PATH, L1_CONFIDENCE_THRESHOLD, L2_CONFIDENCE_THRESHOLD
from tripai.nlp.data_loader import DatasetLoader
from tripai.nlp.layers.layer1_regex_gazetteer import Layer1RegexGazetteer
from tripai.nlp.layers.layer2_semantic import Layer2Semantic
from tripai.nlp.layers.layer3_llm import Layer3LLM

logger = logging.getLogger("tripai_nlp.orchestrator")

class NLPOrchestrator:
    def __init__(self, dataset_path: str = None):
        logger.info("Initializing NLP Intent Extraction Orchestrator...")
        self.loader = DatasetLoader(dataset_path)
        self.layer1 = Layer1RegexGazetteer(self.loader)
        self.layer2 = Layer2Semantic()
        self.layer3 = Layer3LLM(self.loader)
        
        # Ensure log directory exists
        os.makedirs(os.path.dirname(PIPELINE_LOG_PATH), exist_ok=True)

    def route_and_parse(self, text: str) -> Dict[str, Any]:
        start_time = time.time()
        text_lower = text.lower()
        
        # Heuristic checks for complex queries
        has_negation = any(kw in text_lower for kw in ["not", "never", "no ", "avoid", "except", "without", "but no"])
        has_conflict = any(kw in text_lower for kw in ["cheap", "rupees", "npr", "rs"]) and any(kw in text_lower for kw in ["luxury", "5 star", "resort", "expensive", "five star"])
        is_adversarial = any(kw in text_lower for kw in ["ignore previous", "hello world", "moon", "nasa", "hack", "drop tables", "sarcastic"])
        is_extremely_short = len(text.strip().split()) <= 1
        
        resolved_layer = 1
        final_result = None
        
        # Step 1: Run Layer 1 (Regex / Gazetteer)
        l1_res = self.layer1.extract(text)
        
        # Route to Layer 3 if adversarial, negation, or conflict detected
        if is_adversarial or has_negation or has_conflict:
            logger.info("Routing query to Layer 3 due to negation, conflict, or adversarial markers.")
            final_result = self.layer3.parse(text)
            resolved_layer = 3
        else:
            # Check if Layer 1 was highly confident and complete
            # If all required slots are resolved, we can stop at Layer 1
            if not l1_res["missing_fields"] and l1_res["confidence"] >= L1_CONFIDENCE_THRESHOLD:
                logger.info("Layer 1 resolved query with high confidence.")
                final_result = l1_res
                resolved_layer = 1
            else:
                # Step 2: Run Layer 2 (Semantic Search & Mood Anchor Matching)
                logger.info("Routing query to Layer 2 for semantic / mood matching.")
                l2_res = self.layer2.match(text)
                
                # Merge Layer 1 slot extractions (like duration, budget, group_type) into Layer 2 result
                merged_res = l2_res.copy()
                for slot in ["duration_days", "budget_npr", "group_type", "difficulty_level"]:
                    if l1_res[slot] is not None:
                        merged_res[slot] = l1_res[slot]
                        
                # Update missing fields list
                all_required = ["destination", "duration_days", "budget_npr", "category", "activities"]
                merged_res["missing_fields"] = [f for f in all_required if merged_res.get(f) is None or (f == "activities" and not merged_res[f])]
                
                # Evaluate if Layer 2 resolved with enough confidence
                # If we matched a destination/category above the similarity threshold and duration/budget are known or not needed
                if merged_res["confidence"] >= L2_CONFIDENCE_THRESHOLD and not is_extremely_short:
                    logger.info("Layer 2 resolved query successfully.")
                    final_result = merged_res
                    resolved_layer = 2
                else:
                    # Step 3: Run Layer 3 (LLM fallback)
                    logger.info("Routing query to Layer 3 (LLM) due to low confidence or ambiguity.")
                    final_result = self.layer3.parse(text)
                    resolved_layer = 3

        # Post-process final result structure
        duration_ms = int((time.time() - start_time) * 1000)
        final_result["resolved_layer"] = resolved_layer
        final_result["latency_ms"] = duration_ms
        
        # Log resolution
        self._log_case(text, resolved_layer, final_result["confidence"], final_result["trick_or_ambiguous"])
        
        return final_result

    def _log_case(self, text: str, layer: int, confidence: float, trick_or_ambiguous: bool):
        timestamp = datetime.now().isoformat()
        log_line = f"{timestamp} | Query: {text.strip()} | Layer: {layer} | Conf: {confidence:.2f} | Trick: {trick_or_ambiguous}\n"
        try:
            with open(PIPELINE_LOG_PATH, "a", encoding="utf-8") as f:
                f.write(log_line)
        except Exception as e:
            logger.error(f"Failed to write to pipeline log file: {str(e)}")
