const paginate = (model , pageNo = 1, pageSize = 10, filter = {}, populateOpts = '') => {
    const page = parseInt(pageNo, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;

    const skip = (page - 1) * limitNum;

    const [data, totalCount] = await Promise.all([
        model.find(filter).skip(skip).limit(limit).populate(populateOpts),
        model.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        data: data
    };
};