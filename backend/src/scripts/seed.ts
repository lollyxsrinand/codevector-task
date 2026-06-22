import { faker } from "@faker-js/faker";
import { supabase } from "src/lib/supabase"
import { Product } from "../../../types/product";

const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home",
    "Sports",
    "Beauty",
]

const generateProduct = () => {
    const createdAt = faker.date.past()

    const product: Product = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        price: faker.number.float({
            min: 10,
            max: 500,
            fractionDigits: 2,
        }),
        created_at: createdAt.toISOString(),
        updated_at: faker.date.between({
            from: createdAt,
            to: new Date(),
        }).toISOString(),

    }

    return product
}

const products = faker.helpers.multiple(generateProduct, {
    count: 100,
});

for (let i = 0; i < 200; i++) {
    const products = faker.helpers.multiple(generateProduct, {
        count: 1000,
    })

    const { error } = await supabase
        .from("products")
        .insert(products)

    if (error) {
        throw error
    }

    console.log(`batch ${i + 1}/200 complete`)
}

console.log(JSON.stringify(products, null, 2))