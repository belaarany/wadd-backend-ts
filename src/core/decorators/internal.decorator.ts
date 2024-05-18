import { SetMetadata } from "@nestjs/common"

export const Internal = () => SetMetadata("isInternal", true)
