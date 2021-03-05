import { useCallback, useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { SingleMessageApiResponse } from './interface';

const API_ENDPOINT = 'https://bestande.ch/api/chat/messages/';

export const useFetchMessages = (
    messageIds: string[],
): {
    messages: SingleMessageApiResponse[] | null;
} => {
    const [handle] = useState(() => delayRender());

    const [messages, setMessages] = useState<SingleMessageApiResponse[] | null>(null);

    const fetchMessages = useCallback(
        async (messageIds: string[]) => {
            const fetchedMessages = await Promise.all(
                messageIds.map(async (messageId: string) => {
                    const response = await fetch(API_ENDPOINT + messageId);
                    const json = await response.json();
                    return json.data as SingleMessageApiResponse;
                }),
            );
            setMessages(fetchedMessages);
            continueRender(handle);
        },
        [handle],
    );

    useEffect(() => {
        fetchMessages(messageIds);
    }, [fetchMessages, messageIds]);

    return {
        messages,
    };
};
