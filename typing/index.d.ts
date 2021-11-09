declare const useNavigate: () => {
    replace: (url: string) => void;
    goBack: () => void;
    push: (url: string) => void;
    route: import("./typing").NavigateURL<Record<string, unknown>>;
    go: (number: unknown) => void;
};
export default useNavigate;
