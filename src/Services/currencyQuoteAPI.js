const URL_API = 'https://economia.awesomeapi.com.br/json/';

const quoteCurrency = async (currency) => {
  const fetchAPI = await fetch(`${URL_API}${currency}`)
    .then((response) => (response.ok ? Promise
      .resolve(response) : Promise.reject(response)));
  const jsonAns = await fetchAPI.json();
  return jsonAns;
};

export default quoteCurrency;
