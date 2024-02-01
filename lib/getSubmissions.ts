import { z } from 'zod'

const submissionsURL =
    'https://phpstack-454602-4173726.cloudwaysapps.com/api/submissions'

export async function getSubmissions(): Promise<Submission[]> {
    const response = await fetch(submissionsURL)
    const data = await response.json()

    // Use the sumbissions schema to construnct an array of validated data
    const validatedData: Submission[] = data.reduce(
        (acc: Submission[], datum: any) => {
            // Use .safeParse to not throw an error
            const result = submissionSchema.safeParse(datum)

            if (result.success) {
                // if succesful add to list
                acc.push(result.data)
            } else {
                // for this example, just log any errors
                console.error(result.error)
            }
            return acc
        },
        [],
    )

    return validatedData
}

/**
 * This schema has been inferred by the API response, not
 * by Drupal schema / documentation.
 *
 * The purpose of this validation is:
 *  -   Validate the data we receive from the API. i.e. ensure
 *      that each sumbission has the data we need
 *  -   Transform the data into something a bit more usable
 *  -   Provide a typesafety for API data
 */
const submissionSchema = z
    // This is the schema validation
    .object({
        uuid: z.array(z.object({ value: z.string() })).length(1),
        title: z.array(z.object({ value: z.string() })).length(1),

        field_dataviz_img: z
            .array(
                z.object({
                    alt: z.string(),
                    width: z.number(),
                    height: z.number(),
                    url: z.string(),
                }),
            )
            .length(1),
        field_dataviz_owner: z
            .array(
                z.object({
                    value: z.string(),
                }),
            )
            .length(1),
        field_dataviz_country: z
            .array(z.object({ value: z.string() }))
            .length(1),
        field_dataviz_prize: z
            .array(z.object({ value: z.boolean() }))
            .length(1),
        field_dataviz_button: z.array(z.object({ uri: z.string() })).length(1),
    })
    // Transform by removing arrays and renaming fields
    .transform((submission) => ({
        uuid: submission.uuid[0].value,
        title: submission.title[0].value,
        img: submission.field_dataviz_img[0],
        owner: submission.field_dataviz_owner[0].value,
        country: submission.field_dataviz_country[0].value,
        prize: submission.field_dataviz_prize[0].value,
        link: submission.field_dataviz_button[0].uri,
    }))

export type Submission = z.infer<typeof submissionSchema>
