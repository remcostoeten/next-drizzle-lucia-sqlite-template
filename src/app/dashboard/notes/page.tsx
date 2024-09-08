import Flex from '@/components/atoms/Flex';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { ShadInput } from '@/components/ui/ShadInput';
import { createFolder, deleteFolder, editFolder } from '@/core/server/actions';
import { db } from '@/core/server/db';
import { folders } from '@/core/server/schema';
import { lucia } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const revalidate = 0;

async function getFolders(userId: string) {
    return db.select().from(folders).where(eq(folders.userId, userId));
}

async function getSession() {
    const cookieStore = cookies();
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) return null;
    return { session, user };
}

export default async function DashboardPage() {
    const sessionData = await getSession();
    if (!sessionData) notFound();

    const userFolders = await getFolders(sessionData.user.id.toString());

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Notes Dashboard</h1>
            <Suspense fallback={<div>Loading folders...</div>}>
                <FolderList folders={userFolders} />
            </Suspense>
            <CreateFolderForm />
        </div>
    );
}

function FolderList({ folders }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
    );
}

function FolderCard({ folder }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{folder.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{folder.description}</p>
                <div className="w-6 h-6 rounded-full mt-2" style={{ backgroundColor: folder.color }}></div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`/dashboard/notes/${folder.id}`}>
                    <Button variant="outline">View Notes</Button>
                </Link>
                <EditFolderForm folder={folder} />
                <form action={deleteFolder.bind(null, folder.id)}>
                    <Button type="submit" variant="destructive">Delete</Button>
                </form>
            </CardFooter>
        </Card>
    );
}

function CreateFolderForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Folder</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={createFolder} className="space-y-4">
                    <Flex dir='col' gap='1'>
                        <Label htmlFor="name">Name</Label>
                        <ShadInput id="name" name="name" required />
                    </Flex>
                    <Flex dir='col' gap='1'>
                        <Label htmlFor="description">Description</Label>
                        <ShadInput id="description" name="description" />
                    </Flex>
                    <div>
                        <Label htmlFor="color">Color</Label>
                        <Select name="color" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="#FF0000">Red</SelectItem>
                                <SelectItem value="#00FF00">Green</SelectItem>
                                <SelectItem value="#0000FF">Blue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Create Folder</Button>
                </form>
            </CardContent>
        </Card>
    );
}

function EditFolderForm({ folder }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Folder</DialogTitle>
                </DialogHeader>
                <form action={editFolder.bind(null, folder.id)} className="space-y-4">
                    <div>
                        <Label htmlFor="edit-name">Name</Label>
                        <input id="edit-name" name="name" defaultValue={folder.name} required />
                    </div>
                    <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <input id="edit-description" name="description" defaultValue={folder.description} />
                    </div>
                    <div>
                        <Label htmlFor="edit-color">Color</Label>
                        <Select name="color" defaultValue={folder.color} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="#FF0000">Red</SelectItem>
                                <SelectItem value="#00FF00">Green</SelectItem>
                                <SelectItem value="#0000FF">Blue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
