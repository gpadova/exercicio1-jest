import express from "express"
import supertest from "supertest"
import { app } from "../src/index"


describe("Testing fruits routes", () => {
    
    const api = supertest(app)

    it("Insert Fruits Into Db", async () => {
        const body = [{name: "banana", price: 3},
                    {name: "banana", price: 4}]
        await api.post("/fruits").send(body)
        const result = await api.get("/fruits") 
        expect(result.status).toBe(200)
    })

    it("Returns all fruits when called", async () => {
        const resultado = await api.get("/fruits") 
        expect(resultado.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ]))
    }
    )

    it("Returns a specific id fruit when called", async () => {
        const resultado = await api.get(`/fruits/1`) 
        expect(resultado.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
        )
    })

    it("Returns a specific name fruit when called", async () => {
        const result = await api.get(`/fruits/banana`) 
        expect(result.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
        )
    })
})