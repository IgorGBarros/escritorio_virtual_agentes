// src/hooks/useLLMConfiguration.ts
import { useState, useCallback } from 'react';
import { LLMAgentConfiguration, DEFAULT_LLM_CONFIG } from '../config/LLMAgentConfig';

export const useLLMConfiguration = () => {
  const [config, setConfig] = useState<LLMAgentConfiguration>(DEFAULT_LLM_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateLLMResponse = useCallback((scenario: 'startup' | 'enterprise' | 'agency') => {
    setConfig(DEFAULT_LLM_CONFIG);
    return Promise.resolve(DEFAULT_LLM_CONFIG);
  }, []);

  const resetToDefault = useCallback(() => {
    setConfig(DEFAULT_LLM_CONFIG);
    setError(null);
  }, []);

  return {
    config,
    isLoading,
    error,
    simulateLLMResponse,
    resetToDefault
  };
};