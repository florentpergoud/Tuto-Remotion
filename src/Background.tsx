import { FunctionComponent } from 'react';
import { AbsoluteFill } from 'remotion';
import styled from 'styled-components';

export const Background: FunctionComponent = () => {
    return (
        <StyledAbsoluteFill>
            <Card />
        </StyledAbsoluteFill>
    );
};

const StyledAbsoluteFill = styled(AbsoluteFill)`
    padding: 54px;
    background: linear-gradient(to bottom, #7affad, #3be374);
`;

const Card = styled.div`
    flex: 1;
    background-color: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;
