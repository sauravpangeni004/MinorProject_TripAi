import os

# Root directory of the NLP module
NLP_DIR = os.path.dirname(os.path.abspath(__file__))

# Data Configurations
# Default path to the dataset. Fully configurable so it can be swapped later.
DEFAULT_DATASET_PATH = os.environ.get("TRIPAI_DATASET_PATH", r"D:\6th sem\MINORproject\MinorProject_TripAI\datasets.csv")

# FAISS Index Configurations
INDEX_DIR = os.path.join(NLP_DIR, "index")
FAISS_INDEX_PATH = os.path.join(INDEX_DIR, "destinations.faiss")
FAISS_META_PATH = os.path.join(INDEX_DIR, "destinations_meta.pkl")

# Logging Configuration
LOG_DIR = os.path.join(NLP_DIR, "logs")
PIPELINE_LOG_PATH = os.path.join(LOG_DIR, "pipeline.log")

# Ollama / LLM Configurations
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5:3b-instruct")

# Confidence Routing Thresholds
# If Layer 1 extracts slots with combined confidence >= L1_CONFIDENCE_THRESHOLD, route directly.
L1_CONFIDENCE_THRESHOLD = 0.85
# If Layer 2 has a cosine similarity match >= L2_CONFIDENCE_THRESHOLD, route directly.
L2_CONFIDENCE_THRESHOLD = 0.65
