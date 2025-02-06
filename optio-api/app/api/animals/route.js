import connectMongoDB from "../../lib/mongodbConnection";
import { NextResponse } from "next/server";
import Animal from "../../lib/models/animal";

export async function POST(request) {
  try {
    const { name, type, creditCount, imageUrl } = await request.json();
    await connectMongoDB();
    await Animal.create({ name, type, creditCount, imageUrl });
    return NextResponse.json({
      message: "Animal Created",
      status: 200
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to create Animal",
        status: 500
      });
  }
}

export async function GET(request,res) {
  try {
   // await new Promise((resolve) => cors(request, res, resolve)); // Apply CORS middleware

    const url = new URL(request.url);
    const queryParams = url.searchParams;

    // Set default values if not provided
    const currentPage = queryParams.get('pageIndex') ? parseInt(queryParams.get('pageIndex')) : 0;
    const itemsPerPage = queryParams.get('pageSize') ? parseInt(queryParams.get('pageSize')) : 5;
    const searchFilter = queryParams.get('filter') || "";
    const sortField = queryParams.get('sortBy') || "name";
    const sortDirection = queryParams.get('direction') || "asc";

    await connectMongoDB();
    const animals = await Animal.find();   
    const { pagedData, totalItems } = await fetchData(animals, searchFilter, sortField, sortDirection, currentPage, itemsPerPage);
    
    return NextResponse.json({
      items: pagedData,
      totalItems: totalItems,
      pageIndex: currentPage,
      pageSize: itemsPerPage,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to retrieve animals",
      status: 500
    }
    );
  }
}

async function fetchData(data, filter, sortBy, direction, pageIndex, pageSize) {
  // Apply filter if provided
  const filteredData = data.filter((item) => 
    item.name.toLowerCase().includes(filter.toLowerCase()) || 
    item.type.toLowerCase().includes(filter.toLowerCase())
  );
  const totalItems = filteredData.length;   
  // Apply sorting if specified
  const sortedData = filteredData.sort((a, b) => {
    if (direction === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  // Apply pagination
  const pagedData = sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return { pagedData, totalItems };
}
