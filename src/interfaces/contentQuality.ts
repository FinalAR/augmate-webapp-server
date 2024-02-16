export interface IQualityObj {
    content: {
        high: {
            h_size: number;
            h_polyCount: number;
            h_animCount: number;
        };
        mid: {
            m_size: number;
            m_polyCount: number;
            m_animCount: number;
        };
        low: {
            l_size: number;
            l_polyCount: number;
            l_animCount: number;
        };
        flag? : true;
    };
}