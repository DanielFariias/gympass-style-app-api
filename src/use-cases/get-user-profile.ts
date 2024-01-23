import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

interface IGetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: PrismaUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
