const orderKits: ITestKit[] = [
    {
        name: "CLEAR Ship Kit",
        description: "Does not include Ct/Ng oral and rectal swabs",
        slug: "clear-ship-kit-not-pass-approved",
        price: "249.00",
        image: "/image/TestKitsSwabs.png",
        is_best_choice: false,
    },
    {
        name: "CLEAR Ship Kit (PASS-approved)",
        description: "Includes Ct/Ng oral and rectal swabs",
        slug: "clear-ship-kit-pass-approved",
        price: "299.00",
        image: "/image/clear-ship-kit-pass-approved.png",
        is_best_choice: true,
    },
];
export default function useOrderKit() {
    return {
        orderKits,
    };
}
