import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 255 , unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false, default: "user" })
    rol: string;

    @Column({ type: "boolean", default: true })
    isActive: boolean;
}
