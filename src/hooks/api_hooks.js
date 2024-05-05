import { useState, useEffect, useCallback } from "react";
import axios from "api/axios";
import { useAuth } from "hooks/use-auth"
import { useDispatch } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import { useToast } from "./use_toast";

const ORDER_URL = "orders/create-or-get/"
const FOODLIST_URL = "/core/foodlist/";
const FOODID_URL = "/core/food/";
const BEVLIST_URL = "/core/bevlist/";
const CATEGORY_URL = "/core/categories/";
const PREV_ORDERS_URL = "orders/user/all/"

export const useGetFoodList = () => {
    const [foodList, setFoodList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                FOODLIST_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setFoodList(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                showToast("Ошибка сервера", "failure")
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, [showToast]);
    return { foodList, isLoaded };
}

export const useGetFood = (id) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [food, setFood] = useState({});

    const { showToast } = useToast();

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                `${FOODID_URL}${id}/`,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setFood(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                showToast("Ошибка сервера", "failure")
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, [id, showToast])

    return { isLoaded, food }
}

export const usePrevOrders = () => {
    const { token } = useAuth();
    const [prevOrders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                PREV_ORDERS_URL,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(({ data }) => {
                data = data.filter(order => order.status === "COMPLETED")
                data.reverse();
                setOrders(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                // setErrorMessage(response.data.message)
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, []);
    return { prevOrders, isLoaded };
}

export const useGetBevList = () => {
    const [bevList, setBevList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    // const { showToast } = useToast();

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                BEVLIST_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setBevList(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                // setErrorMessage(response.data.message)
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, []);
    return { bevList, isLoaded };
}

export const useGetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // const { showToast } = useToast();

    useEffect(() => {
        setIsLoaded(false)
        try {
            axios.get(
                CATEGORY_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setCategories(data)
                setIsLoaded(true)
            }).catch(({ response }) => {
                // setErrorMessage(response.data.message)
                setIsLoaded(true)
            });
        } catch (err) {
            console.log(err)
        }
    }, []);
    return categories;
}

export function useCart() {
    const { token } = useAuth();
    const [order, setOrder] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const { showToast } = useToast();

    const dispatch = useDispatch();

    useEffect(
        () => {
            setIsLoaded(false)
            if (token) {
                axios.post(
                    ORDER_URL,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                ).then(({ data }) => {
                    console.log(data)
                    axios.get(`orders/${data.id}/`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }).then(({ data }) => {
                        console.log(data)
                        setOrder(data)
                        setIsLoaded(true)
                    }
                    )
                }).catch(err => {
                    console.log(err)
                    dispatch(removeUser())
                    setIsLoaded(true)
                })
            }
            setIsLoaded(true)
        }, [token, dispatch]);

    const handleRefreshOrder = useCallback(() => {
        setIsLoaded(false)
        console.log("started refresh")
        if (order.id) {
            axios.get(`orders/${order.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                console.log(data)
                setOrder(data)
                setIsLoaded(true)
                console.log("finished refresh")
            }
            ).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    showToast("Ошибка сервера", "failure")
                }
                console.log(error)
            })
        }
    }, [token, showToast]);

    const handleAddItem = useCallback(
        (food_id) => {
            setIsLoaded(false)
            axios.post(
                ORDER_URL,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(({ data }) => {
                axios.post(`orders/${data.id}/add_item/`,
                    { "id": food_id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }).then(({ data }) => {
                        setIsLoaded(true)
                        console.log(data)
                        showToast("Успешно добавлено в корзину", "success")
                    }
                    ).catch(err => {
                        if (err.code === "ERR_INTERNET_DISCONNECTED") {
                            showToast("Ошибка сервера", "failure")
                        }
                    })
            }).catch(err => {
                console.log(err)
                if (err.code === "ERR_NETWORK") {
                    showToast("Ошибка сервера", "failure")
                }
                dispatch(removeUser())
                setIsLoaded(true)
            })
        }
        , [token, dispatch, showToast]);

    const handleAddItems = useCallback((items_list) => {
        setIsLoaded(false)
        axios.post(
            ORDER_URL,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(({ data }) => {
            axios.post(`orders/${data.id}/add_items/`,
                { items_list },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(({ data }) => {
                    setOrder(data)
                    setIsLoaded(true)
                    console.log(data)
                    showToast("Успешно добавлено в корзину", "success")
                }
                ).catch(err => {
                    if (err.code === "ERR_INTERNET_DISCONNECTED") {
                        showToast("Ошибка сервера", "failure")
                    }
                })
        }).catch(err => {
            console.log(err)
            if (err.code === "ERR_NETWORK") {
                showToast("Ошибка сервера", "failure")
            }
            dispatch(removeUser())
            setIsLoaded(true)
        })
    }, [showToast, dispatch, token]);

    const handleRemoveItem = useCallback((itemId) => {
        axios.post(`orders/${order.id}/remove_item/`,
            { "id": itemId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                console.log(data)
                showToast("Успешно удалено из корзины", "success")
                setOrder(data)
            }
            ).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    showToast("Ошибка сервера", "failure")
                }
            })
    }, [order, token, showToast]);

    const handleAccept = useCallback(() => {
        axios.post(`orders/${order.id}/accept/`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(({ data }) => {
            console.log(data)
            showToast("Заказ успешно подтвержден", "success")
        }
        ).catch(error => {
            if (error.code === "ERR_NETWORK") {
                showToast("Ошибка сервера", "failure")
            }
        })
    })

    return { order, handleAddItem, handleRemoveItem, handleAddItems, handleRefreshOrder, handleAccept, isLoaded }
}
