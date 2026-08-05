import os
import pandas as pd
from typing import Dict, List, Set, Optional
from tripai.nlp.config import DEFAULT_DATASET_PATH

class DatasetLoader:
    def __init__(self, dataset_path: Optional[str] = None):
        self.dataset_path = dataset_path or DEFAULT_DATASET_PATH
        self.df: Optional[pd.DataFrame] = None
        self.destinations: List[str] = []
        self.districts: List[str] = []
        self.provinces: List[str] = []
        self.categories: List[str] = []
        self.activities: List[str] = []
        self._load_and_process()

    def _load_and_process(self):
        if not os.path.exists(self.dataset_path):
            raise FileNotFoundError(f"Dataset file not found at: {self.dataset_path}")
        
        # Load file based on extension
        if self.dataset_path.endswith(('.xlsx', '.xls')):
            self.df = pd.read_excel(self.dataset_path)
        else:
            self.df = pd.read_csv(self.dataset_path)
            
        # Normalize columns
        # If 'destination_name' doesn't exist, search for common synonyms like 'destination_id.1', 'name'
        cols = self.df.columns
        if 'destination_name' not in cols:
            if 'destination_id.1' in cols:
                self.df = self.df.rename(columns={'destination_id.1': 'destination_name'})
            elif 'name' in cols:
                self.df = self.df.rename(columns={'name': 'destination_name'})
        
        # Fill missing values
        self.df['destination_name'] = self.df['destination_name'].fillna('').astype(str).str.strip()
        self.df['district'] = self.df['district'].fillna('').astype(str).str.strip()
        self.df['province'] = self.df['province'].fillna('').astype(str).str.strip()
        self.df['category'] = self.df['category'].fillna('').astype(str).str.strip()
        self.df['description'] = self.df['description'].fillna('').astype(str).str.strip()
        
        # Extract unique gazetteer elements (excluding empty/nulls)
        self.destinations = sorted(list(self.df['destination_name'].unique()))
        self.destinations = [d for d in self.destinations if d]
        
        self.districts = sorted(list(self.df['district'].unique()))
        self.districts = [d for d in self.districts if d]
        
        self.provinces = sorted(list(self.df['province'].unique()))
        self.provinces = [p for p in self.provinces if p]
        
        self.categories = sorted(list(self.df['category'].unique()))
        self.categories = [c for c in self.categories if c]
        
        # Extract unique activities
        unique_activities = set()
        if 'activities' in self.df.columns:
            for act_str in self.df['activities'].dropna():
                # Split by commas or semicolons
                delimiters = [',', ';']
                acts = [act_str]
                for delim in delimiters:
                    new_acts = []
                    for a in acts:
                        new_acts.extend(a.split(delim))
                    acts = new_acts
                for a in acts:
                    cleaned_act = a.strip()
                    if cleaned_act:
                        unique_activities.add(cleaned_act)
                        
        self.activities = sorted(list(unique_activities))

    def get_dataframe(self) -> pd.DataFrame:
        return self.df

    def get_gazetteer_dict(self) -> Dict[str, List[str]]:
        return {
            "destinations": self.destinations,
            "districts": self.districts,
            "provinces": self.provinces,
            "categories": self.categories,
            "activities": self.activities
        }
