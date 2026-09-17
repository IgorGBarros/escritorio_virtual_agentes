"""Context Merger Module - Merges multiple context sources for agent decision making."""

from typing import Dict, Any, List


class ContextMerger:
    """Merges context from multiple sources into a unified context for agents."""

    def __init__(self):
        self.context_sources: List[Dict[str, Any]] = []

    def add_source(self, context: Dict[str, Any]) -> None:
        """Add a context source to be merged."""
        self.context_sources.append(context)

    def merge(self) -> Dict[str, Any]:
        """Merge all context sources into a single context dictionary.
        
        Later sources override earlier ones for conflicting keys.
        """
        merged: Dict[str, Any] = {}
        for source in self.context_sources:
            merged.update(source)
        return merged

    def clear(self) -> None:
        """Clear all context sources."""
        self.context_sources.clear()