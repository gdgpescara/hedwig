import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getDownloadURL } from "firebase-admin/storage"
import { bucket } from "~/firebase/server"
import uploadFile from "~/data/storage/common/upload-file.ts";

// Mock delle dipendenze
vi.mock('firebase-admin/storage', () => ({
  getDownloadURL: vi.fn()
}))

vi.mock('~/firebase/server', () => ({
  bucket: {
    file: vi.fn()
  }
}))

// Definizione dei tipi per i parametri di save
type SaveOptions = {
  public: boolean;
  private: boolean;
  gzip: boolean;
  resumable: boolean;
  contentType: string;
  metadata: {
    contentType: string;
    contentLength: number;
  };
  validation: string;
}

type SaveCallback = (err: Error | null) => void

type MockFileRef = {
  save: any;
}

describe('uploadFile', () => {
  let mockFileRef: MockFileRef
  let consoleErrorSpy: any

  beforeEach(() => {
    mockFileRef = {
      save: vi.fn()
    }
    ;(bucket.file as any).mockReturnValue(mockFileRef)
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.resetAllMocks()
    consoleErrorSpy.mockRestore()
  })

  it('should successfully upload a file', async () => {
    const inputFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const destination = 'uploads/test.txt'
    const mockDownloadURL = 'https://example.com/test.txt'

    mockFileRef.save.mockImplementation((data: Buffer, options: SaveOptions, callback: SaveCallback) => {
      expect(data).toBeInstanceOf(Buffer)
      expect(options).toMatchObject({
        public: true,
        private: false,
        gzip: true,
        resumable: false,
        contentType: 'text/plain',
        metadata: {
          contentType: 'text/plain',
          contentLength: expect.any(Number)
        },
        validation: 'md5'
      })
      callback(null)
    })
    ;(getDownloadURL as any).mockResolvedValue(mockDownloadURL)

    const result = await uploadFile(inputFile, destination)

    expect(result).toEqual({
      status: 'success',
      data: mockDownloadURL
    })
    expect(bucket.file).toHaveBeenCalledWith(destination)
    expect(mockFileRef.save).toHaveBeenCalled()
    expect(getDownloadURL).toHaveBeenCalledWith(mockFileRef)
  })

  it('should return error when no file is provided', async () => {
    const result = await uploadFile(null as any, 'destination')

    expect(result).toEqual({
      status: 'error',
      data: {
        code: 'hedwig-storage/upload-file:error-no-file',
        message: 'File is required'
      }
    })
  })

  it('should return error when file size is 0', async () => {
    const inputFile = new File([], 'empty.txt', { type: 'text/plain' })
    const result = await uploadFile(inputFile, 'destination')

    expect(result).toEqual({
      status: 'error',
      data: {
        code: 'hedwig-storage/upload-file:error-no-file',
        message: 'File is required'
      }
    })
  })

  it('should handle error during file save', async () => {
    const inputFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const destination = 'uploads/test.txt'
    const saveError = new Error('Save error')

    mockFileRef.save.mockImplementation((data: Buffer, options: SaveOptions, callback: SaveCallback) => {
      callback(saveError)
    })

    const result = await uploadFile(inputFile, destination)

    expect(result).toEqual({
      status: 'error',
      data: {
        code: 'hedwig-storage/upload-file:error',
        message: 'Error uploading file'
      }
    })
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error uploading file:', saveError)
  })

  it('should handle error during getDownloadURL', async () => {
    const inputFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const destination = 'uploads/test.txt'
    const downloadError = new Error('Download URL error')

    mockFileRef.save.mockImplementation((data: Buffer, options: SaveOptions, callback: SaveCallback) => {
      callback(null)
    })
    ;(getDownloadURL as any).mockRejectedValue(downloadError)

    const result = await uploadFile(inputFile, destination)

    expect(result).toEqual({
      status: 'error',
      data: {
        code: 'hedwig-storage/upload-file:error',
        message: 'Error uploading file'
      }
    })
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error uploading file:', downloadError)
  })
})