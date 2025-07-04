
export type Language = "en" | "es" | "fr" | "de" | "zh";
export const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "site.title": "TECHGURUTOOLS",
    "search.placeholder": "Search calculators...",
    "language": "Language",
    "Financial": "Financial",
    "Loan EMI Calculator": "Loan EMI Calculator",
    "Mortgage Calculator": "Mortgage Calculator",
    "Investment Calculator": "Investment Calculator",
    "Tax Calculator": "Tax Calculator",
    "Budget Planner": "Budget Planner",
    "Compound Interest": "Compound Interest",
    "Personal": "Personal",
    "Age Calculator": "Age Calculator",
    "BMI Calculator": "BMI Calculator",
    "Calorie Calculator": "Calorie Calculator",
    "Pregnancy Calculator": "Pregnancy Calculator",
    "Mathematical": "Mathematical",
    "Scientific Calculator": "Scientific Calculator",
    "Unit Converter": "Unit Converter",
    "Percentage Calculator": "Percentage Calculator",
    "Date Calculator": "Date Calculator",
    "Business": "Business",
    "Profit Margin": "Profit Margin",
    "Break-even Point": "Break-even Point",
    "ROI Calculator": "ROI Calculator",
    "E-commerce": "E-commerce",
    "Shipping Cost": "Shipping Cost",
    "Product Pricing": "Product Pricing",
    "Profit Calculator": "Profit Calculator",
    "Conversion Rate": "Conversion Rate",
    "Real Estate": "Real Estate",
    "Property Value": "Property Value",
    "Rent Affordability": "Rent Affordability",
    "Mortgage Payment": "Mortgage Payment",
    "Investment Analysis": "Investment Analysis",
    "Down Payment": "Down Payment",
    "Closing Costs": "Closing Costs",
    "Cap Rate": "Cap Rate",
    "Rental Yield": "Rental Yield",
    "Refinance": "Refinance",
    "Amortization": "Amortization",
    "Social Media": "Social Media",
    "Engagement Rate Calculator": "Engagement Rate Calculator",
    // Add more here as needed...
  },
  es: {
    "site.title": "TECHGURUTOOLS",
    "search.placeholder": "Buscar calculadoras...",
    "language": "Idioma",
    "Financial": "Finanzas",
    "Loan EMI Calculator": "Calculadora Préstamo EMI",
    "Mortgage Calculator": "Calculadora Hipoteca",
    "Investment Calculator": "Calculadora de Inversión",
    "Tax Calculator": "Calculadora de Impuestos",
    "Budget Planner": "Planificador de Presupuesto",
    "Compound Interest": "Interés Compuesto",
    "Personal": "Personal",
    "Age Calculator": "Calculadora de Edad",
    "BMI Calculator": "Calculadora IMC",
    "Calorie Calculator": "Calculadora de Calorías",
    "Pregnancy Calculator": "Calculadora de Embarazo",
    "Mathematical": "Matemáticas",
    "Scientific Calculator": "Calculadora Científica",
    "Unit Converter": "Convertidor de Unidades",
    "Percentage Calculator": "Calculadora de Porcentaje",
    "Date Calculator": "Calculadora de Fechas",
    "Business": "Negocios",
    "Profit Margin": "Margen de Ganancias",
    "Break-even Point": "Punto de Equilibrio",
    "ROI Calculator": "Calculadora ROI",
    "E-commerce": "E-commerce",
    "Shipping Cost": "Costo de Envío",
    "Product Pricing": "Precios de Producto",
    "Profit Calculator": "Calculadora de Ganancias",
    "Conversion Rate": "Tasa de Conversión",
    "Real Estate": "Bienes Raíces",
    "Property Value": "Valor de la Propiedad",
    "Rent Affordability": "Alquiler Asequible",
    "Mortgage Payment": "Pago Hipotecario",
    "Investment Analysis": "Análisis de Inversión",
    "Down Payment": "Pago Inicial",
    "Closing Costs": "Costos de Cierre",
    "Cap Rate": "Tasa de Capitalización",
    "Rental Yield": "Rendimiento del Alquiler",
    "Refinance": "Refinanciar",
    "Amortization": "Amortización",
    "Social Media": "Redes Sociales",
    "Engagement Rate Calculator": "Calculadora de Engagement",
    // Add more translation keys as your site grows...
  },
  fr: {
    "site.title": "TECHGURUTOOLS",
    "search.placeholder": "Rechercher des calculateurs...",
    "language": "Langue",
    "Financial": "Financier",
    "Loan EMI Calculator": "Calculateur Prêt EMI",
    "Mortgage Calculator": "Calculateur d’Hypothèque",
    "Investment Calculator": "Calculateur d’Investissement",
    "Tax Calculator": "Calculateur d’Impôts",
    "Budget Planner": "Planificateur de Budget",
    "Compound Interest": "Intérêts Composés",
    "Personal": "Personnel",
    "Age Calculator": "Calculateur d’Âge",
    "BMI Calculator": "Calculateur IMC",
    "Calorie Calculator": "Calculateur de Calories",
    "Pregnancy Calculator": "Calculateur de Grossesse",
    "Mathematical": "Mathématiques",
    "Scientific Calculator": "Calculatrice Scientifique",
    "Unit Converter": "Convertisseur d’Unités",
    "Percentage Calculator": "Calculateur de Pourcentage",
    "Date Calculator": "Calculateur de Dates",
    "Business": "Affaires",
    "Profit Margin": "Marge Bénéficiaire",
    "Break-even Point": "Seuil de Rentabilité",
    "ROI Calculator": "Calculateur ROI",
    "E-commerce": "E-commerce",
    "Shipping Cost": "Frais de Livraison",
    "Product Pricing": "Tarification Produit",
    "Profit Calculator": "Calculateur de Profit",
    "Conversion Rate": "Taux de Conversion",
    "Real Estate": "Immobilier",
    "Property Value": "Valeur du Bien",
    "Rent Affordability": "Abordabilité du Loyer",
    "Mortgage Payment": "Paiement Hypothécaire",
    "Investment Analysis": "Analyse d’Investissement",
    "Down Payment": "Acompte",
    "Closing Costs": "Frais de Clôture",
    "Cap Rate": "Taux de Capitalisation",
    "Rental Yield": "Rendement Locatif",
    "Refinance": "Refinancer",
    "Amortization": "Amortissement",
    "Social Media": "Réseaux Sociaux",
    "Engagement Rate Calculator": "Calculateur de Taux d’Engagement",
    // ...more keys...
  },
  de: {
    "site.title": "TECHGURUTOOLS",
    "search.placeholder": "Rechner suchen...",
    "language": "Sprache",
    "Financial": "Finanzen",
    "Loan EMI Calculator": "Darlehen EMI Rechner",
    "Mortgage Calculator": "Hypothekenrechner",
    "Investment Calculator": "Investitionsrechner",
    "Tax Calculator": "Steuerrechner",
    "Budget Planner": "Budgetplaner",
    "Compound Interest": "Zinseszins",
    "Personal": "Persönlich",
    "Age Calculator": "Altersrechner",
    "BMI Calculator": "BMI Rechner",
    "Calorie Calculator": "Kalorienrechner",
    "Pregnancy Calculator": "Schwangerschaftsrechner",
    "Mathematical": "Mathematisch",
    "Scientific Calculator": "Wissenschaftlicher Rechner",
    "Unit Converter": "Einheitenumwandler",
    "Percentage Calculator": "Prozentrechner",
    "Date Calculator": "Datumsrechner",
    "Business": "Geschäft",
    "Profit Margin": "Gewinnspanne",
    "Break-even Point": "Break-even Punkt",
    "ROI Calculator": "ROI Rechner",
    "E-commerce": "E-Commerce",
    "Shipping Cost": "Versandkosten",
    "Product Pricing": "Produktpreisgestaltung",
    "Profit Calculator": "Gewinnrechner",
    "Conversion Rate": "Konversionsrate",
    "Real Estate": "Immobilien",
    "Property Value": "Immobilienwert",
    "Rent Affordability": "Mieterschwinglichkeit",
    "Mortgage Payment": "Hypothekenzahlung",
    "Investment Analysis": "Investitionsanalyse",
    "Down Payment": "Anzahlung",
    "Closing Costs": "Abschlusskosten",
    "Cap Rate": "Kapitalisierungsrate",
    "Rental Yield": "Mietrendite",
    "Refinance": "Umschuldung",
    "Amortization": "Tilgungsplan",
    "Social Media": "Soziale Medien",
    "Engagement Rate Calculator": "Engagement-Rechner",
    // ...more keys...
  },
  zh: {
    "site.title": "TECHGURUTOOLS",
    "search.placeholder": "搜索计算器...",
    "language": "语言",
    "Financial": "金融",
    "Loan EMI Calculator": "贷款EMI计算器",
    "Mortgage Calculator": "按揭计算器",
    "Investment Calculator": "投资计算器",
    "Tax Calculator": "税务计算器",
    "Budget Planner": "预算规划",
    "Compound Interest": "复利计算器",
    "Personal": "个人",
    "Age Calculator": "年龄计算器",
    "BMI Calculator": "BMI计算器",
    "Calorie Calculator": "卡路里计算器",
    "Pregnancy Calculator": "孕期计算器",
    "Mathematical": "数学",
    "Scientific Calculator": "科学计算器",
    "Unit Converter": "单位换算器",
    "Percentage Calculator": "百分比计算器",
    "Date Calculator": "日期计算器",
    "Business": "商业",
    "Profit Margin": "利润率",
    "Break-even Point": "盈亏平衡点",
    "ROI Calculator": "投资回报率计算器",
    "E-commerce": "电商",
    "Shipping Cost": "运费计算器",
    "Product Pricing": "产品定价",
    "Profit Calculator": "盈利计算器",
    "Conversion Rate": "转化率",
    "Real Estate": "房地产",
    "Property Value": "房产价值",
    "Rent Affordability": "租金承受力",
    "Mortgage Payment": "按揭付款",
    "Investment Analysis": "投资分析",
    "Down Payment": "首付",
    "Closing Costs": "成交费用",
    "Cap Rate": "资本化率",
    "Rental Yield": "租金收益率",
    "Refinance": "再融资",
    "Amortization": "摊销",
    "Social Media": "社交媒体",
    "Engagement Rate Calculator": "互动率计算器",
    // ...more keys...
  },
};
