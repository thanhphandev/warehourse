import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductName {
  vi: string;
  en: string;
}

export interface IDescription {
  vi?: string | null;
  en?: string | null;
}

export interface IIngredients {
  vi: string;
  en: string;
}

export interface INetWeight {
  value: number;
  unit: string; // e.g., "g", "kg"
}

export interface IShelfLife {
  value: number;
  unit: string; // e.g., "months", "days"
}

export interface IInstructions {
  vi: string[];
  en: string[];
}

export interface IStorageInstructions {
  vi: string;
  en: string;
}

export interface IDietaryInfo {
  suitability: {
    vi: string[];
    en: string[];
  };
  allergen_warnings: {
    vi: string[];
    en: string[];
  };
}

export interface IAdditionalInfoItem {
  key_vi: string;
  key_en: string;
  value_vi: string;
  value_en: string;
}

export interface ICookingInstructions {
  vi?: {
    boil?: string;
    hotpot?: string;
    stir_fry?: string;
  };
  en?: {
    boil?: string;
    hotpot?: string;
    stir_fry?: string;
  };
}
export interface IProduct extends Document {
  sku: string;
  brand_id: mongoose.Types.ObjectId;
  manufacturer_id?: mongoose.Types.ObjectId | null;
  product_name: IProductName;
  description?: IDescription;
  ingredients: IIngredients;
  net_weight: INetWeight;
  shelf_life: IShelfLife;
  usage_instructions: IInstructions;
  storage_instructions: IStorageInstructions;
  dietary_info: IDietaryInfo;
  packaging_details?: IDescription;
  additional_info: IAdditionalInfoItem[];
  cooking_instructions?: ICookingInstructions;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true },

    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    manufacturer_id: { type: Schema.Types.ObjectId, ref: 'Manufacturer', default: null },

    product_name: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },

    description: {
      vi: { type: String, default: null },
      en: { type: String, default: null }
    },

    ingredients: {
      vi: { type: String, required: true },
      en: { type: String, required: true }
    },

    net_weight: {
      value: { type: Number, required: true },
      unit: { type: String, required: true }
    },

    shelf_life: {
      value: { type: Number, required: true },
      unit: { type: String, required: true }
    },

    usage_instructions: {
      vi: [{ type: String }],
      en: [{ type: String }]
    },

    storage_instructions: {
      vi: { type: String },
      en: { type: String }
    },

    dietary_info: {
      suitability: {
        vi: [{ type: String }],
        en: [{ type: String }]
      },
      allergen_warnings: {
        vi: [{ type: String }],
        en: [{ type: String }]
      }
    },

    packaging_details: {
      vi: { type: String, default: null },
      en: { type: String, default: null }
    },

    additional_info: [
      {
        key_vi: String,
        key_en: String,
        value_vi: String,
        value_en: String
      }
    ],

    cooking_instructions: {
      vi: {
        boil: { type: String, default: null },
        hotpot: { type: String, default: null },
        stir_fry: { type: String, default: null }
      },
      en: {
        boil: { type: String, default: null },
        hotpot: { type: String, default: null },
        stir_fry: { type: String, default: null }
      }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
