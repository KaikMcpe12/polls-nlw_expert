import { z } from "zod"
import { randomUUID } from "node:crypto"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function voteOnPoll(app: FastifyInstance){
    app.post('/polls/:pollId/votes', async (req,res) => {
        const voteOnPolLBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })
    
        const { pollId } = voteOnPollParams.parse(req.params)
        const { pollOptionId } = voteOnPolLBody.parse(req.body)

        let { sessionId } = req.cookies

        if(sessionId){
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            if(userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId){
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll.id
                    }
                })
            } else if(userPreviousVoteOnPoll){
                return res.status(400).send({ message: 'You already voted on this poll' })
            }
        }

        if(!sessionId){
            const sessionId = randomUUID()

            res.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30 * 12,
                signed: true,
                httpOnly: true,
            })
        }

        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId,
            }
        })

        return res.status(201).send()
    })
}