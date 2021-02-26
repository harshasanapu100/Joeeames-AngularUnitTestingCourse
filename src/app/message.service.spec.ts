import { MessageService } from "./message.service";

describe('MessageService', () => {
    let messageService: MessageService;

    it('shuld have no messages to start', () => {
        // Arrange
        messageService = new MessageService();

        // Assert
        expect(messageService.messages.length).toBe(0);
    });

    it('shuld add a message when add is called', () => {
        // Arrange
        messageService = new MessageService();
        const input = 'message';

        // Act
        messageService.add(input);

        // Assert
        expect(messageService.messages.length).toBe(1);
    });

    it('shuld remove all messages when clear is called', () => {
        // Arrange
        messageService = new MessageService();
        const input = 'message';
        messageService.add(input);

        // Act
        messageService.clear()

        // Assert
        expect(messageService.messages.length).toBe(0);
    });
});