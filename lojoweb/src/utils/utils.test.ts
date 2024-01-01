
import { formatName, getChatHistoryList, getChat, saveChat } from './utils';
import { LojoChat, LojoChatMetadata } from '../models/LojoChat';

describe('utils', () => {
    test('formatName', () => {
        expect(formatName('  test name  ')).toBe('TEST NAME');
    });

    test('getChatHistoryList', () => {
        // Mock localStorage.getItem
        Storage.prototype.getItem = jest.fn(() => JSON.stringify([{ chatId: '1', name: 'Test Chat' },{ chatId: '2', name: 'Test Chat 2' }]));

        const chatHistoryList = getChatHistoryList();

        expect(chatHistoryList).toEqual([{ chatId: '1', name: 'Test Chat' },{ chatId: '2', name: 'Test Chat 2' }]);
    });

    test('getChat', () => {
        // Mock localStorage.getItem
        Storage.prototype.getItem = jest.fn(() => JSON.stringify({ chatId: '1', name: 'Test Chat' }));

        const chat = getChat('1');

        expect(chat).toEqual({ chatId: '1', name: 'Test Chat' });
    });

});