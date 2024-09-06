import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from '../../favorites/entities/favorites.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToMany(() => Favorite, (favorite) => favorite.id)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;
}
