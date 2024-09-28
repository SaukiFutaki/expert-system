import z from "zod"

export const firstCondition = z.object({
    tipeRumah: z.enum(["32", "44", "21", "36"], {
        errorMap: () => ({ message: "House type must be selected." }),
      }),
  });


export const secondCondition = z.object({
    jenisLantai: z.enum(["keramik", "tanah", "granit", "marmer", "plester"], {
        required_error: "Floor type must be selected.",
      }),
})


export const thirdCondition = z.object({
    jenisAtap: z.enum(["genteng tanah liat", "esbes", "seng"], {
        required_error: "Roof type must be selected.",
      }),
})

export const fourthCondition = z.object({
    jenisMaterial: z.enum(["batako", "hebel", "bata merah"], {
        required_error: "Material type must be selected.",
      }),
})

