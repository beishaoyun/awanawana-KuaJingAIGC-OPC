// Type definitions for KuaJingAIGC-OPC

export type AITabType = "product-selection" | "product-listing" | "keywords" | "sales-forecast" | "competitor-analysis" | "erp-sourcing" | "competitor-stores";

export interface AnalysisResult {
  id: string;
  name: string;
  category?: string;
  marketScore: number;
  competitionScore: number;
  profitMargin: number;
  source?: string;
  reason?: string;
  demand?: string;
  competition?: string;
  trend?: string;
  score?: number;
}

export interface KeywordData {
  keyword: string;
  volume?: number;
  views?: number;
  mentions?: number;
  competition?: string;
  difficulty?: number;
  trend?: string;
  adsBid?: number;
  posts?: number;
  engagement?: number;
  hashtag?: string;
}

export interface ForecastResult {
  category?: string;
  baseSales: number;
  growthRate: number;
  predictedSales?: number;
  predictedRevenue?: number;
  confidence: number;
  forecastData?: { month: string; predictedSales: number | string }[];
  gmvForecast?: {
    month1: number;
    month3: number;
    month6: number;
  };
  factors?: { name: string; impact: string; positive: boolean }[];
}

export interface HistoricalSalesRecord {
  id: number;
  name: string;
  category: string;
  month: string;
  sales: number;
  revenue: number;
  growth: number;
  price: number;
  source: string;
}
