import { assert } from "https://deno.land/std/testing/asserts.ts"
import { BitDepth, decodeBitmap, encodeBitmap } from "../mod.ts"

const [width, height, bitdepth] = [302, 171, 1 as BitDepth]
const zbuf = Uint8Array.from([
	0, 0, 3, 55, 73, 68, 65, 84, 120, 218, 197, 88, 59,
	142, 220, 48, 12, 165, 104, 99, 71, 197, 98, 199, 72, 149,
	206, 62, 66, 202, 116, 235, 163, 228, 8, 91, 166, 91, 31,
	205, 71, 200, 17, 156, 46, 165, 3, 164, 240, 6, 30, 51,
	133, 63, 250, 81, 18, 179, 107, 96, 216, 204, 140, 241, 230,
	81, 34, 159, 72, 202, 0, 140, 93, 200, 127, 130, 28, 236,
	59, 116, 144, 55, 69, 212, 11, 216, 16, 160, 17, 192, 74,
	128, 74, 0, 211, 172, 131, 192, 170, 16, 201, 193, 26, 25,
	91, 11, 34, 35, 162, 41, 207, 86, 128, 204, 169, 177, 87,
	138, 167, 227, 114, 56, 45, 136, 198, 40, 219, 103, 59, 206,
	143, 81, 88, 99, 199, 25, 163, 176, 214, 142, 179, 74, 197,
	99, 91, 91, 77, 68, 49, 182, 139, 235, 190, 139, 192, 180,
	44, 29, 181, 113, 74, 180, 11, 20, 37, 137, 231, 96, 198,
	147, 50, 255, 74, 37, 235, 73, 150, 211, 42, 35, 163, 109,
	11, 175, 68, 71, 82, 19, 48, 50, 48, 148, 41, 53, 128,
	41, 239, 155, 206, 177, 161, 88, 189, 113, 24, 134, 37, 32,
	205, 86, 158, 224, 244, 157, 48, 204, 193, 180, 140, 173, 250,
	31, 167, 234, 30, 59, 205, 194, 154, 251, 101, 97, 173, 14,
	9, 88, 155, 103, 155, 238, 21, 55, 1, 108, 188, 215, 218,
	186, 51, 217, 148, 0, 54, 156, 189, 5, 60, 131, 109, 45,
	48, 189, 216, 105, 121, 234, 22, 244, 135, 216, 174, 107, 51,
	208, 108, 143, 49, 176, 151, 117, 209, 85, 144, 118, 191, 187,
	204, 71, 59, 165, 227, 203, 214, 197, 209, 154, 101, 208, 41,
	9, 13, 235, 212, 9, 83, 124, 4, 213, 254, 33, 110, 89,
	88, 149, 18, 175, 177, 103, 162, 229, 232, 142, 243, 254, 37,
	216, 66, 11, 160, 186, 152, 120, 221, 110, 59, 90, 108, 138,
	103, 219, 182, 161, 248, 44, 162, 237, 163, 148, 41, 164, 96,
	228, 230, 58, 197, 77, 180, 235, 231, 28, 99, 91, 255, 252,
	197, 248, 213, 9, 89, 234, 72, 177, 60, 96, 43, 224, 193,
	12, 150, 85, 252, 96, 128, 162, 204, 78, 171, 100, 21, 140,
	159, 133, 93, 110, 139, 3, 107, 100, 243, 251, 43, 217, 54,
	24, 129, 204, 9, 167, 67, 114, 106, 59, 172, 55, 2, 153,
	18, 108, 189, 255, 28, 147, 34, 60, 18, 130, 146, 122, 148,
	154, 224, 57, 88, 41, 184, 107, 89, 149, 224, 208, 255, 213,
	10, 161, 97, 251, 38, 42, 95, 138, 124, 182, 154, 99, 123,
	200, 13, 240, 43, 236, 107, 220, 145, 205, 230, 201, 129, 248,
	128, 168, 196, 29, 216, 186, 86, 248, 75, 91, 2, 221, 33,
	23, 203, 217, 90, 134, 117, 173, 120, 201, 94, 26, 48, 179,
	52, 107, 116, 127, 202, 141, 62, 71, 161, 116, 109, 180, 212,
	60, 31, 122, 12, 194, 244, 187, 50, 207, 8, 55, 167, 117,
	114, 166, 217, 7, 90, 53, 136, 198, 188, 37, 163, 158, 22,
	0, 0, 85, 238, 152, 54, 0, 0, 40, 107, 168, 152, 29,
	105, 42, 0, 0, 44, 115, 68, 90, 214, 196, 75, 0, 0,
	212, 81, 141, 217, 203, 202, 179, 41, 0, 0, 172, 100, 59,
	171, 41, 52, 128, 194, 250, 213, 1, 0, 54, 89, 175, 45,
	0, 96, 155, 45, 72, 141, 108, 170, 169, 105, 148, 13, 63,
	143, 108, 95, 33, 132, 171, 219, 64, 148, 44, 243, 29, 199,
	118, 43, 125, 182, 159, 40, 187, 210, 203, 156, 86, 28, 108,
	22, 203, 82, 242, 98, 109, 58, 245, 190, 48, 134, 221, 20,
	59, 73, 155, 212, 97, 157, 33, 234, 253, 190, 73, 51, 230,
	142, 66, 172, 106, 17, 129, 136, 141, 100, 59, 93, 152, 193,
	82, 26, 183, 65, 146, 82, 142, 109, 146, 221, 62, 70, 121,
	225, 10, 238, 89, 227, 123, 83, 63, 124, 224, 26, 59, 73,
	82, 58, 171, 203, 196, 21, 180, 194, 13, 222, 91, 196, 169,
	223, 44, 112, 102, 51, 79, 194, 156, 186, 42, 159, 112, 225,
	253, 185, 81, 25, 49, 146, 249, 95, 158, 211, 64, 132, 43,
	224, 205, 141, 56, 198, 146, 208, 38, 71, 217, 253, 93, 171,
	153, 204, 136, 136, 186, 128, 237, 198, 85, 136, 16, 246, 103,
	251, 252, 235, 197, 173, 231, 147, 110, 191, 172, 38, 110, 94,
	220, 47, 54, 214, 49, 5, 244, 52, 99, 2, 113, 235, 156,
	133, 92, 252, 73, 5, 130, 189, 118, 80, 122, 107, 253, 97,
	13, 45, 42, 58, 182, 199, 102, 146, 194, 137, 248, 237, 83,
	226, 200, 244, 177, 73, 220, 181, 107, 206, 165, 39, 124, 149,
	62, 172, 207, 91, 171, 142, 219, 63, 148, 204, 30, 73, 125,
	187, 7, 49
].slice(8, -4))

Deno.test("decoding zlib compressed IDAT then re-encoding twice", () => {
	const t0 = performance.now()
	const pixels = decodeBitmap(zbuf, width, height, bitdepth) // decode zlib compressed IDAT into pixels
	const zbuf2 = encodeBitmap(pixels, width, height, bitdepth) // encode pixels into zlib compressed IDAT
	const pixels2 = decodeBitmap(zbuf2, width, height, bitdepth) // decode the new zlib compressed IDAT into pixels again
	const t1 = performance.now()
	let errors = 0
	for (let i = 0; i < pixels.length; i++) errors += pixels[i] === pixels2[i] ? 0 : 1 // check the number of pixel mismatches after re-encoding
	assert(errors === 0, `number of mismatches: ${errors}`)
	console.log("test 1 concluded. time spent: ", t1 - t0, " ms")
})