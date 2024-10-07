import Bottleneck from 'bottleneck';

export const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 250,
});
