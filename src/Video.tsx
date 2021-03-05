import { Composition } from 'remotion';
import { Stories } from './Stories';

const FPS = 30;
const SECONDS_DURATION = 7;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionVideo: React.FC = () => {
    return (
        <>
            <Composition
                id="Stories"
                component={Stories}
                durationInFrames={SECONDS_DURATION * FPS}
                fps={FPS}
                width={WIDTH}
                height={HEIGHT}
                defaultProps={{
                    messageIds: ['b077588c-488f-458c-bf5a-33585850c3ae', 'dcd83c57-aa47-45a2-b41d-0bd8d3f95724'],
                }}
            />
        </>
    );
};
