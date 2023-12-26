import Sort, {menu} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Categories from "../components/Categories";

import { useEffect, useRef } from "react";
import Pagination from "../components/Pagination/index";

import {useSelector} from "react-redux";

import * as qs from "qs";

import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/store";

import * as React from 'react';
import { FilterSelector } from "../redux/slices/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/slices/filter/slice";
import { PizzaSelector } from "../redux/slices/pizza/selector";
import { fetchPizzas } from "../redux/slices/pizza/slice";




const Home = () => {
    const {categoryId, currentPage, sort, searchValue} = useSelector(FilterSelector);
    const dispatch = useAppDispatch();

    const isMounted = useRef(false);
    const isSearch = useRef(false);

    const {items, status} = useSelector(PizzaSelector);
    const navigate = useNavigate();


    const onChangeCategory = React.useCallback((index: number) => {
        dispatch(setCategoryId(index))
    }, []);

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';//если есть минус делаем сортировку по возврастанию иначе по убвапнию
        const sortBy = sort.sortProperty.replace('-', '');//удалить минус из свойства если он будет
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

       try {
           dispatch(fetchPizzas({
               order,
               sort: {
                   sortProperty: sortBy,
                   sortDirection: order === 'asc' ? 'asc' : 'desc',
               },
               category,
               search,
               currentPage: String(currentPage),
           }));
       } catch (error){
           console.log(error);
       }

    };

    //если быд первый рендер то проверяем url параметры и сохраняем в редуксе
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params: FilterSliceState = qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
    //
    //         const sort = menu.find((object) => object.sortProperty === params.sortBy);
    //         if (sort) {
    //             params.sort = sort;
    //         }
    //
    //         dispatch(setFilters(params)
    //         )
    //         isSearch.current = true;
    //     }
    // }, []);

    //если быд первый рендер то запрашиваем пиццы
    useEffect(() => {
         getPizzas();
        }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    //ксли был первый рендер и изменили параметры
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             categoryId,
    //             currentPage,
    //             sortProperty: sort.sortProperty,
    //         });
    //
    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, []);


    const itemsPizzas = items.map((item) => {
        return (

                <PizzaBlock
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.imageUrl}
                    sizes={item.sizes}
                    types={item.types}
                />

        )
    });


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'rejected' ? (
                <div className='content__error-info'>
                    <h2>Oh, something happened, try again...</h2>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : itemsPizzas}
                </div>
            )}

            <Pagination page={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;