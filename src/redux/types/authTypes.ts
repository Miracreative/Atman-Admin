export interface AuthState {
    isLoggedIn: boolean;
    user: {
        [key: string]: any; // Или более конкретный тип, если знаете структуру user
    };
}
