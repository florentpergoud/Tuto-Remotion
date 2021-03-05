import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';
import { Background } from './Background';
import { DURATION_PER_CHARACTER } from './constant';
import { Message } from './Message';
import { useFetchMessages } from './useFetchMessages';

interface Props {
    messageIds: string[];
}

export const Stories: React.FC<Props> = ({ messageIds }) => {
    const { messages } = useFetchMessages(messageIds);
    const { fps, durationInFrames } = useVideoConfig();
    const delayBetweenMessages = fps;
    const frame = useCurrentFrame();

    const finalAnimationDurationInFrame = 20;
    const finalAnimationStartFrame = frame - durationInFrames + finalAnimationDurationInFrame; //final animation starts when this value equal 0

    if (!messages) {
        return null;
    }

    const messagesDurations = messages.map(
        (data) => data.message.text.length * DURATION_PER_CHARACTER + delayBetweenMessages,
    );

    const finalAnimation = spring({
        frame: finalAnimationStartFrame,
        fps,
        config: { damping: 200 },
    });

    const outTranslateY = interpolate(finalAnimation, [0, 1], [0, -200]);

    return (
        <AbsoluteFill>
            <Background />
            <MessagesContainer
                $opacity={interpolate(finalAnimation, [0, 0.5], [1, 0])}
                $translateYValue={outTranslateY}
            >
                {messages.map((message, index) => {
                    const delay = messagesDurations.slice(0, index).reduce((a, b) => a + b, 0);
                    const animation = spring({ frame: frame - delay, fps, config: { damping: 200 } });
                    const translateYValue = interpolate(animation, [0, 1], [200, 0]);
                    return (
                        <MessageContainer $opacity={animation} $translateYValue={translateYValue}>
                            <Message key={message.message._id} data={message} delay={delay} />
                        </MessageContainer>
                    );
                })}
            </MessagesContainer>
        </AbsoluteFill>
    );
};

const MessagesContainer = styled(AbsoluteFill)<{ $opacity: number; $translateYValue: number }>`
    justify-content: center;
    opacity: ${({ $opacity }) => $opacity};
    transform: ${({ $translateYValue }) => `translateY(${$translateYValue}px)`};
`;

const MessageContainer = styled.div<{ $opacity: number; $translateYValue: number }>`
    opacity: ${({ $opacity }) => $opacity};
    transform: ${({ $translateYValue }) => `translateY(${$translateYValue}px)`};
`;
