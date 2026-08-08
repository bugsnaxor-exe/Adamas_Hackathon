const paginate = async (
    model,
    pageNo = 1,
    pageSize = 10,
    filter = {},
    populateOpts = "",
    sortOpts = { createdAt: -1 },
) => {
    const page = parseInt(pageNo, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
        model
            .find(filter)
            .populate(populateOpts)
            .sort(sortOpts)
            .skip(skip)
            .limit(limit),
        model.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        data: data,
    };
};
