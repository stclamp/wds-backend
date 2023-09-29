import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'posts',
})
export class Post extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_alt!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  read_time!: number;
}
