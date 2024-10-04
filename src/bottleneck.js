import Bottleneck from 'bottleneck';

export default limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 333,
});
