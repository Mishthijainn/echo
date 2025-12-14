"use client"
import { api } from "@workspace/backend/_generated/api"
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@workspace/ui/components/table"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll"
import { usePaginatedQuery } from "convex/react"
import type { PublicFile } from "@workspace/backend/private/files"
import { Button } from "@workspace/ui/components/button"
import { FileIcon, MoreHorizontalIcon, PlusIcon, TrashIcon, Loader2Icon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu"
import { UploadDialog } from "../components/upload-dialog"
import { useState } from "react"
import { DeleteFileDialog } from "../components/delete-file-dialog"
export const FilesView = () => {
    const files = usePaginatedQuery(
        api.private.files.list,
        {},
        {
            initialNumItems: 10
        }
    )
    const {
        topElementRef,
        handleLoadMore,
        canLoadMore,
        isLoadingFirstPage,
        isLoadingMore
    } = useInfiniteScroll({
        status: files.status,
        loadMore: files.loadMore,
        loadSize: 32
    })
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null)
    const handleDeleteClick = (file: PublicFile) => {
        setSelectedFile(file)
        setDeleteDialogOpen(true)
    }
    const handleFileDeleted = () => {
        setSelectedFile(null)
    }
    return (
        <>
            <DeleteFileDialog
                onOpenChange={setDeleteDialogOpen}
                open={deleteDialogOpen}
                file={selectedFile}
                onDeleted={handleFileDeleted}
            ></DeleteFileDialog>
            <UploadDialog
                onOpenChange={setUploadDialogOpen}
                open={uploadDialogOpen}
            ></UploadDialog>
            <div className="flex min-h-screen flex-col bg-muted p-6 md:p-8">
                <div className="mx-auto w-full max-w-screen-lg">
                    <div className="mb-8 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                                    Knowledge Base
                                </h1>
                                <p className="text-muted-foreground">
                                    Upload and manage documents for your AI assistant
                                </p>
                            </div>
                            <Button
                                onClick={() => setUploadDialogOpen(true)}
                                size="lg"
                                className="shadow-md transition-all hover:shadow-lg"
                            >
                                <PlusIcon className="mr-2 size-4" />
                                Upload File
                            </Button>
                        </div>
                    </div>
                    <div className="mt-8 rounded-lg border-2 bg-background shadow-lg">
                        <div className="flex items-center justify-end border-b px-6 py-4 bg-muted/50">
                            <div className="text-sm text-muted-foreground">
                                {files.results.length} {files.results.length === 1 ? 'file' : 'files'} uploaded
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-6 py-4 font-medium">Name</TableHead>
                                    <TableHead className="px-6 py-4 font-medium">Type</TableHead>
                                    <TableHead className="px-6 py-4 font-medium">Size</TableHead>
                                    <TableHead className="px-6 py-4 font-medium">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(() => {
                                    if (isLoadingFirstPage) {
                                        return (
                                            <TableRow>
                                                <TableCell className="h-32 text-center" colSpan={4}>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
                                                        <p className="text-sm text-muted-foreground">Loading files...</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    if (files.results.length === 0) {
                                        return (
                                            <TableRow>
                                                <TableCell className="h-32 text-center" colSpan={4}>
                                                    <div className="flex flex-col items-center gap-3 py-8">
                                                        <FileIcon className="size-12 text-muted-foreground/50" />
                                                        <div className="space-y-1 text-center">
                                                            <p className="font-medium">No files uploaded yet</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Upload your first document to train your AI assistant
                                                            </p>
                                                        </div>
                                                        <Button
                                                            onClick={() => setUploadDialogOpen(true)}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <PlusIcon className="mr-2 size-4" />
                                                            Upload File
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    return files.results.map((file) => (
                                        <TableRow className="hover:bg-muted/50" key={file.id}>
                                            <TableCell className="px-6 py-4 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <FileIcon></FileIcon>
                                                    {file.name}

                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 font-medium">
                                                <Badge className="uppercase" variant="outline">
                                                    {file.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-muted-foreground">
                                                <Badge className="uppercase" variant="outline">
                                                    {file.size}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button className="size-8 p-8"
                                                            size="sm"
                                                            variant="ghost">
                                                            <MoreHorizontalIcon></MoreHorizontalIcon>

                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(file)}>
                                                            <TrashIcon className="size-4 mr-2"></TrashIcon>
                                                            Delete
                                                        </DropdownMenuItem>

                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))

                                })()}
                            </TableBody>
                        </Table>
                        {!isLoadingFirstPage && files.results.length > 0 && (
                            <div className="border-t">
                                <InfiniteScrollTrigger
                                    canLoadMore={canLoadMore}
                                    isLoadingMore={isLoadingMore}
                                    onLoadMore={handleLoadMore}
                                    ref={topElementRef}
                                />
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}