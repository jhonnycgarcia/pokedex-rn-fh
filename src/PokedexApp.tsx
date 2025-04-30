import './gesture-handler.native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

// Create a client
const queryClient = new QueryClient();

export const PokedexApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <StackNavigator />
            </ThemeContextProvider>
        </QueryClientProvider>
    );
};
