import type { NewUser, User, UserId } from "@/domain/users/entities";
import type { UserRepository } from "@/domain/users/ports";
import { getSupabaseServerClient } from "@/lib/supabase";

export class UserRepositorySupabase implements UserRepository {
  private client = getSupabaseServerClient();

  async getById(_id: UserId): Promise<User | null> {
    throw new Error("Not implemented");
  }

  async getByEmail(_email: string): Promise<User | null> {
    throw new Error("Not implemented");
  }

  async create(_input: NewUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async update(_user: User): Promise<User> {
    throw new Error("Not implemented");
  }
}

