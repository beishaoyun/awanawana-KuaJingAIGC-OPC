"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Calendar, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { historicalSalesData } from "@/lib/data";
import type { ForecastResult, HistoricalSalesRecord } from "@/types";

export default function SalesForecast() {
  const [product, setProduct] = useState({
    name: "",
    category: "Hoodies",
    price: 35,
    targetMonth: "2026-06"
  });

  const [result, setResult] = useState<ForecastResult | null>(null);
  const [isForecasting, setIsForecasting] = useState(false);

  const handleForecast = () => {
    if (!product.name.trim()) {
      alert("请输入商品名称");
      return;
    }

    setIsForecasting(true);

    setTimeout(() => {
      // 获取历史数据
      const categoryHistory = historicalSalesData.filter((h: HistoricalSalesRecord) => h.category === product.category);
      const avgSales = categoryHistory.length > 0
        ? categoryHistory.reduce((sum: number, h: HistoricalSalesRecord) => sum + h.sales, 0) / categoryHistory.length
        : 5000;
      const avgGrowth = categoryHistory.length > 0
        ? categoryHistory.reduce((sum: number, h: HistoricalSalesRecord) => sum + h.growth, 0) / categoryHistory.length
        : 10;

      // 模拟预测数据
      const forecastData = [
        { month: "1 月", predictedSales: Math.floor(avgSales * 0.8) },
        { month: "2 月", predictedSales: Math.floor(avgSales * 0.9) },
        { month: "3 月", predictedSales: Math.floor(avgSales) },
        { month: "4 月", predictedSales: Math.floor(avgSales * 1.1) },
        { month: "5 月", predictedSales: Math.floor(avgSales * 1.2) },
        { month: "6 月", predictedSales: Math.floor(avgSales * 1.4) },
      ];

      setResult({
        category: product.category,
        baseSales: avgSales,
        growthRate: avgGrowth,
        forecastData,
        gmvForecast: {
          month1: Math.floor(avgSales * 0.8 * product.price),
          month3: Math.floor(avgSales * 3 * product.price * 1.1),
          month6: Math.floor(avgSales * 6 * product.price * 1.3),
        },
        confidence: 85,
        factors: [
          { name: "历史趋势", impact: "+25%", positive: true },
          { name: "市场竞争", impact: "-8%", positive: false },
          { name: "季节因素", impact: "+15%", positive: true },
          { name: "价格定位", impact: "+5%", positive: true },
        ]
      });

      setIsForecasting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-2">销量预测</h2>
        <p className="text-gray-400">基于多维度算法预测未来 6 个月销量趋势</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">商品名称</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="例如：Oversized Hoodie"
              className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">商品分类</label>
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none"
            >
              <option>Hoodies</option>
              <option>T-Shirts</option>
              <option>Pants</option>
              <option>Jackets</option>
              <option>Leggings</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">目标月份</label>
            <input
              type="month"
              value={product.targetMonth}
              onChange={(e) => setProduct({ ...product, targetMonth: e.target.value })}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">售价 ($)</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleForecast}
          disabled={isForecasting || !product.name.trim()}
          className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          {isForecasting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              正在预测中...
            </>
          ) : (
            <>
              <BarChart3 className="w-5 h-5" />
              开始预测
            </>
          )}
        </button>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* GMV Forecast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-gray-400">第 1 个月</span>
              </div>
              <div className="text-3xl font-bold">${result.gmvForecast?.month1.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mt-1">预测 GMV</div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-gray-400">前 3 个月</span>
              </div>
              <div className="text-3xl font-bold">${result.gmvForecast?.month3.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mt-1">预测 GMV</div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                <span className="text-gray-400">前 6 个月</span>
              </div>
              <div className="text-3xl font-bold">${result.gmvForecast?.month6.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mt-1">预测 GMV</div>
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-6">6 个月销量预测趋势</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.forecastData}>
                  <defs>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [String(value), "预测销量"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="predictedSales"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#forecastGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Factors */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">预测因子影响</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.factors?.map((factor) => (
                <div
                  key={factor.name}
                  className={`p-4 rounded-xl border ${
                    factor.positive
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  <div className="text-sm text-gray-400 mb-1">{factor.name}</div>
                  <div className={`text-lg font-semibold ${
                    factor.positive ? "text-green-400" : "text-red-400"
                  }`}>
                    {factor.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence & Summary */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">预测置信度</h3>
              <div className="text-2xl font-bold text-primary">{result.confidence}%</div>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              基于历史数据、市场趋势和季节性因素综合分析，置信度{result.confidence}%表示预测结果的可靠程度。
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
