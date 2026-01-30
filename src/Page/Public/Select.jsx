import { useState } from "react";
import CustomSelect from "../../Component/Public/CustomSelect/CustomSelect";
const selectOptions = [
    {
        id: "order",
        icon: "ShoppingCart",
        label: "Nouvelle commande",
    },
    {
        id: "payment",
        icon: "CreditCard",
        label: "Paiement reçu",
    },
    {
        id: "shipping",
        icon: "Truck",
        label: "Commande expédiée",
    },
    {
        id: "refund",
        icon: "RotateCcw",
        label: "Remboursement",
    },
    {
        id: "message",
        icon: "Mail",
        label: "Nouveau message client",
    },
    {
        id: "user",
        icon: "User",
        label: "Nouvel utilisateur",
    },
    {
        id: "alert",
        icon: "AlertTriangle",
        label: "Alerte système",
    },
    {
        id: "promotion",
        icon: "BadgePercent",
        label: "Promotion activée",
    },
    {
        id: "report",
        icon: "BarChart3",
        label: "Rapport disponible",
    },
    {
        id: "settings",
        icon: "Settings",
        label: "Mise à jour des paramètres",
    },
];
export default function Select({ }) {
    const [choice, setChoice] = useState(null);

    return (
        <>
            <CustomSelect selectOptions={selectOptions} onChange={(value) => setChoice(value)} />
        </>
    )
}