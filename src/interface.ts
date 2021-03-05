export type User = {
    username: string;
    id: string;
    avatar: string | null;
    joined: number;
    lastUsernameChange: number;
    admin: boolean;
    verified?: boolean;
};

export type ChatMessage = {
    _id: string;
    text: string;
    createdAt: number;
    uni_identifier: string;
    university: 'UZH';
    userId: string;
    system?: boolean;
    likes?: string[];
    quotes?: string;
};

export type SingleMessageApiResponse = {
    message: ChatMessage;
    user: User;
    usersWhoLiked: User[];
};
