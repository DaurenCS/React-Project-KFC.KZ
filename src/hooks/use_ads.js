import axios from "api/axios";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "./use_toast";

const ADS_URL = "core/adverts/"

export const useGetAds = () => {
    const [banners, setBanners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                ADS_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setBanners(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                showToast("Ошибка сервера", "failure")
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, [showToast]);
    return { banners, isLoaded };
}