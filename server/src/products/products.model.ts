import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ProductCreationAttrs {
    name: string;
    price: string;
    shortDesc: string;
    image: string;
    images: string[];
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    price: string;

    @Column({ type: DataType.STRING })
    shortDesc: string;

    @Column({ type: DataType.STRING })
    image: string;

    @Column({ type: DataType.ARRAY(DataType.STRING) }) // Array of image file names
    images: string[];

    @Column({ type: DataType.INTEGER, allowNull: true})
    countStock: number;
    /*____________________________________________________________
    @ForeignKey(() => ProductInfo)    
    @Column({ type: DataType.INTEGER})
    infoId: number;

    //many to many as in user roles
    @Column({ type: DataType.STRING})
    categories: Category[];
    
    @Column({ type: DataType.STRING, allowNull: true})
    rating: string;

    @Column({ type: DataType.STRING, allowNull: true})
    reviews: string; */
}
