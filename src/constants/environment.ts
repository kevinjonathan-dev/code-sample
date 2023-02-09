const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

const ENV = { IS_DEV, IS_PROD };

export default ENV;
