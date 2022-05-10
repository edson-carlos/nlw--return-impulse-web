import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";
// 1:44:00

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
    /* { create: async () => {} },
       { sendMail: async () => {}} */
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64test.jpg',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64test.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64test.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });    
});