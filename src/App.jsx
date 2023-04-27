import {createElement} from "react";
import {createRoot} from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route, Link,
} from "react-router-dom";
import Details from "./details/Details";
import SearchParams from "./SearchParams";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
});

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <div>
                    <header>
                        <Link to={'/'}>Adopt me</Link>
                    </header>

                    <Routes>
                        <Route path="/details/:id" element={<Details/>}/>
                        <Route path="/" element={<SearchParams/>}/>
                    </Routes>
                </div>
            </QueryClientProvider>
        </BrowserRouter>
    );
};


createRoot(
    document.getElementById("root")
).render(createElement(App));