import { format } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { Img, interpolate, useCurrentFrame } from 'remotion';
import styled from 'styled-components';
import { GiftedAvatar } from './Avatar';
import { DURATION_PER_CHARACTER } from './constant';
import heart from './heart.svg';
import { SingleMessageApiResponse } from './interface';

interface Props {
    data: SingleMessageApiResponse;
    delay: number;
}

const LIKE_ANIMATION_FRAME_DURATION = 8;

const getOpacityForWord = (words: string[], index: number, frame: number) => {
    const wordsBefore = words.slice(0, index);
    const characterCount = wordsBefore.join('').length;
    const frameToStartShowingWord = characterCount * DURATION_PER_CHARACTER;
    return interpolate(
        frame,
        [frameToStartShowingWord, frameToStartShowingWord + words[index].split('').length * DURATION_PER_CHARACTER],
        [0, 1],
    );
};

export const Message: React.FC<Props> = ({ data, delay }) => {
    const likeArray = data.usersWhoLiked.map((m) => m.username);
    const words = data.message.text.split(' ');

    const frame = useCurrentFrame();
    const animationStartFrame = frame - delay;
    const likeAnimationStart = data.message.text.length * DURATION_PER_CHARACTER;
    const likeOpacity = interpolate(
        animationStartFrame,
        [likeAnimationStart, likeAnimationStart + LIKE_ANIMATION_FRAME_DURATION],
        [0, 1],
    );

    return (
        <Container>
            <Row>
                <GiftedAvatar user={data.user} />
                <Spacer />
                <Right>
                    <View>
                        <Row>
                            <User>{data.user.username}</User>
                            <Time>{format(data.message.createdAt, 'HH:MM')}</Time>
                        </Row>
                        <WordsContainer>
                            {words.map((word, index) => {
                                return (
                                    <Word $opacity={getOpacityForWord(words, index, frame - delay)}>{word + ' '}</Word>
                                );
                            })}
                        </WordsContainer>
                    </View>
                    <LikesContainer $opacity={likeOpacity}>
                        {likeArray.length > 0 ? (
                            <>
                                <Heart src={heart} />
                                <div style={{ width: 15 }} />
                                <LikesLabel>
                                    {likeArray.length > 2
                                        ? likeArray[0] + ' + ' + String(likeArray.length - 1) + ' ' + 'others'
                                        : likeArray.join(', ')}
                                </LikesLabel>
                            </>
                        ) : null}
                    </LikesContainer>
                </Right>
            </Row>
        </Container>
    );
};

const Container = styled.div`
    font-size: 45px;
    line-height: 1.3;
    margin-left: 100px;
    margin-right: 100px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 50px;
    margin-top: 50px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Spacer = styled.div`
    width: 30px;
`;

const Right = styled.div`
    flex: 1;
`;

const User = styled.div`
    font-weight: bold;
    font-size: 0.8em;
    margin-bottom: 9px;
    margin-right: 14px;
`;

const Time = styled.div`
    color: gray;
    font-size: 0.8em;
`;

const LikesLabel = styled.div`
    color: rgba(0, 0, 0, 0.2);
    font-size: 0.9em;
    align-items: center;
    margin-top: 9px;
`;

const LikesContainer = styled(Row)<{ $opacity: number }>`
    align-items: center;
    margin-top: 9px;
    opacity: ${({ $opacity }) => $opacity};
`;

const Heart = styled(Img)`
    width: ${342 * 0.09}px;
    height: ${315 * 0.09}px;
`;

const WordsContainer = styled.div``;

const Word = styled.span<{ $opacity: number }>`
    opacity: ${({ $opacity }) => $opacity};
`;
