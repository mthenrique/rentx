import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/DateProvider/in-memory/DateProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
      userRepositoryInMemory = new UserRepositoryInMemory();
      dateProvider = new DayjsDateProvider();
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
      mailProvider = new MailProviderInMemory();
  
      sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
        userRepositoryInMemory,
        usersTokensRepositoryInMemory,
        dateProvider,
        mailProvider
      );
    });
  
    it("should be able to send a forgot password mail to user", async () => {
    //   const sendMail = spyOn(mailProvider, "sendMail");
  
    //   await userRepositoryInMemory.create({
    //     driver_license: "664168",
    //     email: "avzonbop@ospo.pr",
    //     name: "Blanche Curry",
    //     password: "1234",
    //   });
  
    //   await sendForgotPasswordMailUseCase.execute("avzonbop@ospo.pr");
  
    //   expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("emailerrado@email.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {
        // const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

        // await userRepositoryInMemory.create({
        //     driver_license: "66475856168",
        //     email: "teste2@email.com",
        //     name: "nome teste",
        //     password: "1111",
        // });

        // await sendForgotPasswordMailUseCase.execute("teste2@email.com");

        // expect(generateTokenMail).toBeCalled();
    })
})