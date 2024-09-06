import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorites } from '../../favorites/entities/favorites.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToMany(() => Favorites, (favorite) => favorite.id)
  favorites: Favorites[];

  @CreateDateColumn()
  createdAt: Date;
}
