import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from "../adpters/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdpater: MailAdapter,
    ) {}

    async execute(request : SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Type is required.')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
           throw new Error('Invalid screenshot format.') 
        }
        /* const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

        await prismaFeedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
        Com essa abordagem a aplicação está acoplada ao prisma, dificultando a alteração da estratégia
       */
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
        // Com essa abordagem fica mais fácil trocar futaramente do prismaFeedbacksRepossitory para outra
        // O prisma é inversamente injetado nessa classe

        await this.mailAdpater.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" width="600px"/>` : ``,
                `</div>`,
            ].join('\n')
        })
    }
}