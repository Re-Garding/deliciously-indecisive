--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-4.pgdg20.04+1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-4.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.ratings (
    rating_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    user_id integer NOT NULL,
    rating double precision NOT NULL,
    name character varying(50) NOT NULL,
    search_location character varying(100) NOT NULL,
    distance real NOT NULL
);


ALTER TABLE public.ratings OWNER TO hackbright;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.ratings_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_rating_id_seq OWNER TO hackbright;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.ratings_rating_id_seq OWNED BY public.ratings.rating_id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.restaurants (
    restaurant_id integer NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(200) NOT NULL,
    img_url character varying(200) NOT NULL,
    url character varying(200) NOT NULL,
    phone character varying(15) NOT NULL,
    city character varying(50) NOT NULL
);


ALTER TABLE public.restaurants OWNER TO hackbright;

--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.restaurants_restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_restaurant_id_seq OWNER TO hackbright;

--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.restaurants_restaurant_id_seq OWNED BY public.restaurants.restaurant_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(40) NOT NULL,
    password character varying(20) NOT NULL,
    fname character varying(20) NOT NULL,
    lname character varying(20) NOT NULL,
    default_location character varying(100)
);


ALTER TABLE public.users OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: ratings rating_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.ratings ALTER COLUMN rating_id SET DEFAULT nextval('public.ratings_rating_id_seq'::regclass);


--
-- Name: restaurants restaurant_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN restaurant_id SET DEFAULT nextval('public.restaurants_restaurant_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.ratings (rating_id, restaurant_id, user_id, rating, name, search_location, distance) FROM stdin;
2	2	1	4.5	Little India	Eagle Mountain, UT	19851.082
4	4	1	3.5	Ganesh Indian Cuisine	Eagle Mountain, UT	22984.229
5	5	1	3	Tadka Indian Restaurant	Eagle Mountain, UT	40508.555
6	6	1	2	Great India	Eagle Mountain, UT	35648.895
7	7	1	1.5	Saffron Circle	Eagle Mountain, UT	21942.895
8	8	1	1	Bombay House	Eagle Mountain, UT	33362.625
25	9	1	1	Tandoor Indian Grill	Orem	5543.2227
26	10	1	1	India Palace	Orem	7727.365
27	3	1	1	Kohinoor	Orem	306.92523
28	11	1	1	Bombay House	Orem	7179.949
29	1	1	1	Cafe Namasthe	Orem	14933.776
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.restaurants (restaurant_id, name, address, img_url, url, phone, city) FROM stdin;
1	Cafe Namasthe	1438 E Main St	https://s3-media1.fl.yelpcdn.com/bphoto/UkjAIvIMA6Y3489KyJgP8Q/o.jpg	https://www.yelp.com/biz/cafe-namasthe-lehi?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(385) 352-7124	Lehi
2	Little India	987 W 500 N	https://s3-media3.fl.yelpcdn.com/bphoto/vpTLU_oWoTlQ22fkJ_cK1A/o.jpg	https://www.yelp.com/biz/little-india-american-fork-2?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 756-8888	American Fork
3	Kohinoor	75 S State St	https://s3-media2.fl.yelpcdn.com/bphoto/lplfjbXF-4f2GCTk5Y6MQA/o.jpg	https://www.yelp.com/biz/kohinoor-orem?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 226-6666	Orem
4	Ganesh Indian Cuisine	784 E State Rd	https://s3-media1.fl.yelpcdn.com/bphoto/GGvbviHQh1WzqhioR8m5Eg/o.jpg	https://www.yelp.com/biz/ganesh-indian-cuisine-american-fork?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(385) 265-4126	American Fork
5	Tadka Indian Restaurant	952 E 100th N	https://s3-media3.fl.yelpcdn.com/bphoto/FCQKRhqmUKlIaom3v1iUng/o.jpg	https://www.yelp.com/biz/tadka-indian-restaurant-payson?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 465-6999	Payson
6	Great India	752 West Blue Vista Ln	https://s3-media3.fl.yelpcdn.com/bphoto/-SXDK7obWAwPYMwl8YbOpg/o.jpg	https://www.yelp.com/biz/great-india-midvale?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 495-4141	Midvale
7	Saffron Circle	4594 W Partridgehill Ln	https://s3-media1.fl.yelpcdn.com/bphoto/OMoH9JSgCo2bakGjS4xlJA/o.jpg	https://www.yelp.com/biz/saffron-circle-riverton?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 206-4115	Riverton
8	Bombay House	7726 Campus View Dr	https://s3-media4.fl.yelpcdn.com/bphoto/IeJjibyf5VUKzUHoakU_tQ/o.jpg	https://www.yelp.com/biz/bombay-house-west-jordan?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 282-0777	West Jordan
9	Tandoor Indian Grill	1600 N Freedom Blvd	https://s3-media3.fl.yelpcdn.com/bphoto/yJ6uqs8XE2VUMGRIWRaeOw/o.jpg	https://www.yelp.com/biz/tandoor-indian-grill-provo-3?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 960-9048	Provo
10	India Palace	98 W Center St	https://s3-media3.fl.yelpcdn.com/bphoto/XMpF6Z6DhQW4VQb-pOMm1g/o.jpg	https://www.yelp.com/biz/india-palace-provo?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 373-7200	Provo
11	Bombay House	463 N University Ave	https://s3-media1.fl.yelpcdn.com/bphoto/mKf00rhvsJOBBPqIOcaRKQ/o.jpg	https://www.yelp.com/biz/bombay-house-provo-2?adjust_creative=If6xlEBjHZrrGQQ_wE7L7w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=If6xlEBjHZrrGQQ_wE7L7w	(801) 373-6677	Provo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.users (user_id, email, password, fname, lname, default_location) FROM stdin;
1	becky@gardings.com	1234	Becky	Garding	Eagle Mountain, UT
\.


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 29, true);


--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.restaurants_restaurant_id_seq', 29, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rating_id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (restaurant_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: ratings ratings_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id);


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

